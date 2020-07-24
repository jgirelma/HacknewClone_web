export default function HomeReducer(state : any, action : any) {
  switch (action.type) {
    case "firstPage" : {
      return {...state,  page : 1 }
    }
    case "nextPage" : {
      return {...state,  page : state.page + 1 }
    }
    case "lastPage" : {
      return {...state, page : state.page - 1}
    }

    case "newest" : {
      return {...state, order : 'Newest'}
    }

    case "day" : {
      return {...state, order : 'Top: 1 Day'}
    }

    case "week" : {
      return {...state, order : 'Top: 1 Week'}
    }

    case "month" : {
      return {...state, order : 'Top: 1 Month'}
    }

    case "all" : {
      return {...state, order : 'Top: All'}
    }
  
    default:
      return state
  }
}