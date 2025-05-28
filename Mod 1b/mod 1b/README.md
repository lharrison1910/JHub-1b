# Jhub scheme module 1b challange

This is my submission for the jhub scheme module 1b challange.

I use the police government api to query a 1-mile square around a given address via postcode.

- See documentation - [here](https://data.police.uk/docs/method/crimes-at-location/)
### Example response
```json
[
    {
        "category": "other-theft", 
        "persistent_id": "bb06e351c7056b9d74fcf5d519cc45e0318f72e1a39bdf45f9551a2743396d58", 
        "location_subtype": "", 
        "id": 116206187, 
        "location": {
            "latitude": "52.629831", 
            "street": {
                "id": 1738423, 
                "name": "On or near Marquis Street"
            }, 
            "longitude": "-1.132503"
        }, 
        "context": "", 
        "month": "2024-01", 
        "location_type": "Force", 
        "outcome_status": {
            "category": "Unable to prosecute suspect", 
            "date": "2024-02"
        }
    }, 
    {
        "category": "violent-crime", 
        "persistent_id": "4f8e06f87cb05c4a19f690aa1531cd94a4736fd7f5ad99328c00a3cde3d68c85", 
        "location_subtype": "", 
        "id": 116206306, 
        "location": {
            "latitude": "52.629831", 
            "street": {
                "id": 1738423, 
                "name": "On or near Marquis Street"
            }, 
            "longitude": "-1.132503"
        }, 
        "context": "", 
        "month": "2024-01", 
        "location_type": "Force", 
        "outcome_status": {
            "category": "Unable to prosecute suspect", 
            "date": "2024-02"
        }
    },
    ...
]
```

Also use an api to convert postcode into a latitude and longitude.
 - See documentation - [here](https://postcodes.io/docs/overview)
### Example response
```json
{
  "status": 200,
  "result": {
    "postcode": "BR8 7RE",
    "quality": 1,
    "eastings": 551626,
    "northings": 170342,
    "country": "England",
    "nhs_ha": "South East Coast",
    "longitude": 0.178871,
    "latitude": 51.411831,
    "european_electoral_region": "South East",
    "primary_care_trust": "West Kent",
    "region": "South East",
    "lsoa": "Sevenoaks 001A",
    "msoa": "Sevenoaks 001",
    "incode": "7RE",
    "outcode": "BR8",
    "parliamentary_constituency": "Sevenoaks",
    "parliamentary_constituency_2024": "Sevenoaks",
    "admin_district": "Sevenoaks",
    "parish": "Hextable",
    "admin_county": "Kent",
    "date_of_introduction": "198001",
    "admin_ward": "Hextable",
    "ced": "Swanley",
    "ccg": "NHS Kent and Medway",
    "nuts": "Sevenoaks",
    "pfa": "Kent",
    "codes": {
      "admin_district": "E07000111",
      "admin_county": "E10000016",
      "admin_ward": "E05009960",
      "parish": "E04012394",
      "parliamentary_constituency": "E14001465",
      "parliamentary_constituency_2024": "E14001465",
      "ccg": "E38000237",
      "ccg_id": "91Q",
      "ced": "E58000739",
      "nuts": "TLJ46",
      "lsoa": "E01024445",
      "msoa": "E02005087",
      "lau2": "E07000111",
      "pfa": "E23000032"
    }
  }
}
```
