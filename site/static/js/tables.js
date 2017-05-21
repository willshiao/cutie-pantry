// $(document).ready(function(){
$.get('/api/items', (data) => {
  const niceData = data.data.map(item => {
    item.expiryDate = new Date(item.expiryDate).toLocaleDateString('en-US');
    return item;
  });
  console.log(niceData);
  $('#infotable').DataTable({
    data: niceData,
    columns: [{data: 'name'}, {data: 'quantity'}, {data: 'expiryDate'}]
  });
});
  // $('#infotable').DataTable({
    // columns: ['name', 'quantity' /*, 'Expiry Date' */],
  // });
// });
