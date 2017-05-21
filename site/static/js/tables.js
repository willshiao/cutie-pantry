// $(document).ready(function(){
  $('#infotable').DataTable({
    ajax: '/api/items',
    columns: ['name', 'quantity' /*, 'Expiry Date' */],
  });
// });
