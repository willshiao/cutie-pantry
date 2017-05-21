$.ajax({
  method: 'GET',
  url: '/api/recipe',
  dataType: 'json',
  success: function(data) {
    console.log(data.data);
    const recipes = data.data.hits.map(item => item.recipe);
    recipes.forEach(item => {
      const template = `<div class="media">
        <div class="media-left">
          <a href="${item.url}">
            <img class="media-object" width="100" src="${item.image}" alt="...">
          </a>
        </div>
        <div class="media-body">
          <a href="${item.url}"><h3 class="media-heading">${item.label}</h3></a>
          ${item.healthLabels.join(', ')}
        </div>
      </div>`;
      $('#recipes').append(template);
    });
  },
})
