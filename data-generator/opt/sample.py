import sys
import pandas as pd
import json
import re
import hashlib

from bs4 import BeautifulSoup
import requests

# https://www.city.narashino.lg.jp/kurashi/gomi/gomi/r6calendar.html をparseして、
# ゴミカレンダーへのlinkを取ってきて紐づける
GOMI_URL_PATH = "https://www.city.narashino.lg.jp/kurashi/gomi/gomi/"

# memo: 取り出したいところをparentheses()でくくる
DAY_STRINGS = ["日", "月", "火", "水", "木", "金", "土"]
DAYS_REG_EXP = "[日,月,火,水,木,金,土]"
DAYS_LIST_REG_EXP = f"{DAYS_REG_EXP}(・{DAYS_REG_EXP})*"
NON_WEEKLY_SCHEDULE_EXP = f"第(.*)({DAYS_LIST_REG_EXP})曜日"

def getDayNumbers(days):
  return list(
    map(
      lambda d: (DAY_STRINGS.index(d)) if (d in DAY_STRINGS) else 0,
      days.split("・")
    )
  )

def parseWeeklySchedule(input):
  return {
    'days': getDayNumbers(input),
  }

def parseNonWeeklySchedule(input):
  parsedData = re.search(NON_WEEKLY_SCHEDULE_EXP, input)
  weeksInStr = re.split("[･・]", parsedData.group(1))
  return {
    'weeks': list(map(int, weeksInStr)),
    'days': getDayNumbers(parsedData.group(2)),
  }

def parseSchedule(input):
  if re.fullmatch(DAYS_LIST_REG_EXP, input):
    return parseWeeklySchedule(input)
  if re.fullmatch(NON_WEEKLY_SCHEDULE_EXP, input):
    return parseNonWeeklySchedule(input)

def normalizeAreaName(name):
  return name.replace('丁目', '')

def getYearlyCalendar(areaName, pdfLinks):
  normalizedAreaName = normalizeAreaName(areaName)
  link = list(filter(lambda link: normalizeAreaName(link.text).find(normalizedAreaName) != -1, pdfLinks))
  if len(link) > 0:
    return f"https:{link[0]['href']}"
  else:
    return ""

def main():
  html = requests.get(f"{GOMI_URL_PATH}r6calendar.html")
  soup = BeautifulSoup(html.content, "html.parser")
  pdfLinks = soup.find_all("a", {"class": "pdf"})

  df = pd.read_excel('gomi-data.xls')

  keys = {
    'area': df.columns[1],
    'burnable': df.columns[2],
    'incombustible': df.columns[3],
    'recyclable': df.columns[4],
    'harmful': df.columns[5],
  }

  scheduleTable = []

  for index, row in df.iterrows():
    areaName = df.at[index, keys['area']]
    schedule = {
      "area": {
        "id": hashlib.md5(areaName.encode('utf-8')).hexdigest(),
        "name": areaName,
      },
      "burnable": parseSchedule(df.at[index, keys['burnable']]),
      "incombustible": parseSchedule(df.at[index, keys['incombustible']]),
      "recyclable": parseSchedule(df.at[index, keys['recyclable']]),
      "harmful": parseSchedule(df.at[index, keys['harmful']]),
      "calendar": getYearlyCalendar(areaName, pdfLinks),
    }
    scheduleTable.append(schedule)

  schedulesJson = json.dumps(scheduleTable, ensure_ascii=False, indent=4)
  print(schedulesJson)

  with open('schedule.json', mode='wt', encoding='utf-8') as file:
    json.dump(scheduleTable, file, ensure_ascii=False, indent=2)

if __name__ == "__main__":
  main()
