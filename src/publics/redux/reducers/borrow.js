const initialState = {
	borrowList: [],
	isLoading: false,
	isFulfilled: false,
	isRejected: false,
}

const borrow = (state = initialState, action) => {
	switch (action.type) {
		case 'POST_BORROW_PENDING':
			return {
				...state,
				isLoading: true,
				isFulfilled: false,
				isRejected: false
			};
		case 'POST_BORROW_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true
			};
		case 'POST_BORROW_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				borrowList: [state.bookList, action.payload.data[0]]
			};
		case 'GET_BORROW_PENDING':
			return {
				...state,
				isLoading: true,
				isFulfilled: false,
				isRejected: false
			};
		case 'GET_BORROW_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true
			};
		case 'GET_BORROW_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				borrowList: action.payload.data.result
			};
		case 'PATCH_BOOK_PENDING':
			return {
				...state,
				isLoading: true,
				isFulfilled: false,
				isRejected: false
			};
		case 'PATCH_BOOK_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true
			};
		case 'PATCH_BOOK_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				bookList: [state.borrowList, action.payload.data[0]]
			};

		case 'USER_BORROW_PENDING':
			return {
				...state,
				isLoading: true,
				isFulfilled: false,
				isRejected: false
			};
		case 'USER_BORROW_REJECTED':
			return {
				...state,
				isLoading: false,
				isRejected: true
			};
		case 'USER_BORROW_FULFILLED':
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				borrowList: action.payload.data.result
			};

		default:
			return state;
	}
};

export default borrow;