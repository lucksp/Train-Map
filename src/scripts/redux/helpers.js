// this helper function ensures that the graph and map always are in sync.
// Some items do not have Lat/Long so we do not want those items appearing
// in 1 and not the other.
export function getFilteredData(data) {
  return data
    .filter(item => {
      return item.values.positionLat && item.values.positionLong;
    })
    .map(item => {
      return (item = {
        ...item,
        ...item.values
      });
    });
}
