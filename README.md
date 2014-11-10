# Commission Junction (CJ Affiliate by Conversant) API wrapper for Meteor

Provides product and link search functionality available on the server.

## Installation

`meteor add bredikhin:cj`

## Usage

```javascript
var config = {
  developerKey: 'get it on https://api.cj.com/',
  websiteId: 12345 // Get from the Account > Websites while logged into cj.com
};
var cj = new Cj(config);

// Find products
cj.productSearch({keywords: '+McQueen +shoes'}, function(err, res) {
  if (err)
    return console.log(err);

  console.log(JSON.stringify(res));
});

// Find links
cj.linkSearch({keywords: '+shoes +sale'}, function(err, res) {
  if (err)
    return console.log(err);

  console.log(JSON.stringify(res));
});
```

## Response formats

### Products

```json
{
  "$": {
    "total-matched": "253",
    "records-returned": "50",
    "page-number": "1"
  },
  "product": [
    {
      "ad-id": [
        "..."
      ],
      "advertiser-id": [
        "..."
      ],
      "advertiser-name": [
        "..."
      ],
      "advertiser-category": [
        "LACE UP SHOES"
      ],
      "buy-url": [
        "..."
      ],
      "catalog-id": [
        "..."
      ],
      "currency": [
        "EUR"
      ],
      "description": [
        "..."
      ],
      "image-url": [
        "..."
      ],
      "in-stock": [
        "true"
      ],
      "isbn": [
        ""
      ],
      "manufacturer-name": [
        "ALEXANDER MCQUEEN"
      ],
      "manufacturer-sku": [
        ""
      ],
      "name": [
        "ALEXANDER MCQUEEN - GRADIENT CALF LEATHER OXFORD SHOES"
      ],
      "price": [
        "..."
      ],
      "retail-price": [
        "..."
      ],
      "sale-price": [
        "..."
      ],
      "sku": [
        "..."
      ],
      "upc": [
        ""
      ]
    },
    ...
  ]
}
```

### Links

```json
{
  "$": {
    "total-matched": "85",
    "records-returned": "10",
    "page-number": "1"
  },
  "link": [
    {
      "advertiser-id": [
        "..."
      ],
      "advertiser-name": [
        "..."
      ],
      "category": [
        "shoes"
      ],
      "click-commission": [
        "0.0"
      ],
      "creative-height": [
        "0"
      ],
      "creative-width": [
        "0"
      ],
      "language": [
        "en"
      ],
      "lead-commission": [
        ""
      ],
      "link-code-html": [
        "..."
      ],
      "link-code-javascript": [
        "..."
      ],
      "description": [
        "..."
      ],
      "destination": [
        "..."
      ],
      "link-id": [
        "..."
      ],
      "link-name": [
        "..."
      ],
      "link-type": [
        "Text Link"
      ],
      "performance-incentive": [
        "true"
      ],
      "promotion-end-date": [
        ""
      ],
      "promotion-start-date": [
        ""
      ],
      "promotion-type": [
        ""
      ],
      "relationship-status": [
        "joined"
      ],
      "sale-commission": [
        "..."
      ],
      "seven-day-epc": [
        "0.00"
      ],
      "three-month-epc": [
        "..."
      ]
    },
    ...
  ]
}
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 [Ruslan Bredikhin](http://ruslanbredikhin.com/)
