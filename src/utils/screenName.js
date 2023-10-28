const restaurantStack = {
  tab: "RestaurantsTab",
  restaurants: "Restaurants",
  addRestaurant: "AddRestaurant",
  restaurant: "Restaurant",
};

const favoritesStack = {
  tab: "FavoritesTab",
  favorites: "Favorites",
};

const rankingStack = {
  tab: "RankingTab",
  ranking: "Ranking",
};

const searchStack = {
  tab: "SearchTab",
  search: "Search",
};

const accountStack = {
  tab: "AccountTab",
  account: "Account",
  login: "Login",
  register: "Register",
};

const otherStack = {
  tab: "OtherTab",
  other: "Other",
};

//puedo cambiar el nombre solo en el tab y de esta manera no debo cambiar en toda la app si cambia el nombre
export const screen = {
  restaurant: restaurantStack,
  favorites: favoritesStack,
  ranking: rankingStack,
  search: searchStack,
  account: accountStack,
  other: otherStack,
};
