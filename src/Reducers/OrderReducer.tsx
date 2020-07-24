export default function OrderReducer(state : any, action : any) {
  switch (action.type) {
    case "newest": {
      return "Newest";
    }

    case "day": {
      return "Top: 1 Day";
    }

    case "week": {
      return"Top: 1 Week";
    }

    case "month": {
      return "Top: 1 Month";
    }

    case "all": {
      return "Top: All";
    }
    default:
      return state;
  }
}
