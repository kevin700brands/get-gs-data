import axios from 'axios';

async function GetDataFromGS() {
    // https://www.freecodecamp.org/news/cjn-google-sheets-as-json-endpoint/
    const { data } = await axios.get(
      'https://spreadsheets.google.com/feeds/cells/188tjzx-z-Iw2_blTg3bdGmP9measqC-nnVLv_rPVZeI/1/public/full?alt=json',
    );

    // constants
    const entries = [];
    const ids = [];
    const name = [];
    const age = [];

    for (const entry of data.feed.entry) {
      const row = entry.gs$cell.row;
      const col = entry.gs$cell.col;
      const item = entry.content.$t;

      // column 1 for `ids`
      if (col == 1 && row != 1) {
        ids.push(item);
      }

      // column 2 for `name`
      if (col == 2 && row != 1) {
        name.push(entry.content.$t);
      }

      // column 3 for `age`
      if (col == 3 && row != 1) {
        age.push(entry.content.$t);
      }
    }

    // arrange json data
    for (let i = 0; i < ids.length; i++) {
      entries.push({ id: ids[i], name: name[i], age: age[i] });
    }
  }