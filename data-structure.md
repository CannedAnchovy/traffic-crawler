# Data Structure

## general data structure
**data structures that inherit from these general data structure must have the following defined property**

### `crawlList`

- `source` (string) The source website where crawler crawl the list data from.

- `crawlerStatus` (object) An object containing crawler status. Crawler will look up this object to determine what to do next.

  - `getList` (bool) Whether the crawler has finished crawling list item info from source.

  - `getTraffic` (bool) Whether the crawler has finished retrieving traffic data from similar web.

- `data` (array of list item)

### `traffic`

- `success` (bool) Whether this traffic object is crawled completely

- `successDate` (date) the time this traffic is crawled completely

- `totalVisit` (string)

- `marketingMix` (object)

  - `channelTraffic` (string)

  - `percentages` (array of string)

  - `numbers` (array of string)

- `geographyRank` (array of `rankElement`)

- `referralRank` (array of `rankElement`)

- `socialRank` (array of `rankElement`)

- `adRank` (array of `rankElement`)

### `rankElement`

- `name` (string)

- `percentage` (string)

- `number` (string)

---

## ico event

### `icoEvent`

- `status` (string)

- `name` (string)

- `icoUrl` (string)

- `raised` (string)

- `url` (string)

- `endDate` (string) YYYY/MM/DD format string

- `traffic` (traffic)
