// $(document).ready(function(){
$.get('/api/items', (data) => {
  // ajax: '/api/items',
  console.log(data);
  $('#infotable').DataTable({
    data: data.data,
    columns: [{data: 'name'}, {data: 'quantity'}, {data: 'expiryDate'}]
  });
});
  // $('#infotable').DataTable({
    // columns: ['name', 'quantity' /*, 'Expiry Date' */],
  // });
// });
