import json

def merge_json_files(file1, file2):
    with open(file1, 'r') as f1:
        data1 = json.load(f1)
    with open(file2, 'r') as f2:
        data2 = json.load(f2)

    merged_data = []
    for d1 in data1:
        for d2 in data2:
            if d1['name'] == d2['COUNTY_NAM']:
                merged_data.append({**d1, **d2})

    with open('merged.json', 'w') as outfile:
        json.dump(merged_data, outfile, indent=4)

merge_json_files('counties.json', 'kenya.geojson.json')
