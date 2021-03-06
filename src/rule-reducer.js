
import { RULES_LOADED, RULE_ADDED, RULE_UPDATED } from './rules-actions'
import { DO_LIKE, DO_DISLIKE } from './likes-actions'

const INITIAL_STATE = [];

const ruleReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case RULES_LOADED:
            return action.payload;

        case RULE_ADDED:
            const newRules = [...state, action.payload];
            console.log("Rule-Reducer ADDED: ", newRules)
            return newRules

        case RULE_UPDATED:
            const idx = state.findIndex(rule => rule.id === action.payload.id)
            const newRule = [...state]
            newRule[idx] = action.payload
            return newRule;

        case DO_LIKE: 
        case DO_DISLIKE: {
            const index = state.findIndex(rule => rule.id === action.payload)
            const newRule = { ...state[index] }
            if (action.type == DO_LIKE) { newRule.likes += 1; newRule.dislikes = 0; }
            else { newRule.dislikes += 1; newRule.likes = 0 }
            const newRules = [...state] // Must be a new copy as it is immutable
            newRules[index] = newRule; 
            return newRules
        }
 
        default: return state;
    }
}

export default ruleReducer;