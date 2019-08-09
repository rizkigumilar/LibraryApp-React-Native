const initialState = {
    pageList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
}

const page = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PAGE_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_PAGE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_PAGE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                pageList: action.payload.data.result
            };

        default:
            return state;
    }
};

export default page;