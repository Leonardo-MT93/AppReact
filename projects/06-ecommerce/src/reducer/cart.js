
export const cartInitialState = [] // HACER QUE PERMANEZCA EN EL LOCALSTORATGE
export const cartReducer = (state, action) => {
    const {payload: actionPayload, type: actionType} = action
    switch(actionType){
        case 'ADD_TO_CART':{
            const {id} = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)
            if(productInCartIndex >= 0){
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                return newState
            }
            //Si no esta en el carrito
            return[
                ...state,
                {
                    ...actionPayload, // = product
                    quantity: 1
                }
            ]
        }
        case 'REMOVE_FROM_CART': {
            const {id} = actionPayload
            return state.filter(item => item.id !== id)
        }
        case 'CLEAN_CART': {
            return cartInitialState
        }
    } 

    return state
}