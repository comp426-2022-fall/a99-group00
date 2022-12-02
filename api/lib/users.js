// Functions that update user database
// Currently each function returns a hardcoded example

// Input: user name
// Output: JSON object with user, last_access, correct_answers, and incorrect_answers
// TODO: Gets the data of the specified user from the database
export function get_user(user) {
    return {'user': 'alan', 'last_access': '1555599990', 'correct_answers': 10, 'incorrect_answers': 15};
}

// Input: user name
// Output: JSON object with user, last_access, correct_answers, and incorrect_answers
// TODO: Create new user in database with current time and scores of 0
export function create_user(user) {
    return {'user': 'alan', 'last_access': '1555599990', 'correct_answers': 0, 'incorrect_answers': 0};
}

// Input: user name, correct (true if last answer was correct)
// Output: JSON object with updated user, last_access, correct_answers, and incorrect_answers
// TODO: Update user score in database and last_access
export function update_user(user, correct) {
    // if user answered correctly (correct == true), increase correct_answer score by 1
    // if user answered incorrectly (correct == false), increase incorrect_answer score by 1

    // return updated user info back to api
    return {'user': 'alan', 'last_access': '1555599990', 'correct_answers': 10, 'incorrect_answers': 15};
}

// Input: user name, correct (true if last answer was correct)
// Output: True (if delete was successful), False (if delete failed/user did not exist)
// TODO: delete specified user from database
export function delete_user(user) {
}

// Input: none
// Output: JSON list of top 5 scoring users in database.
export function leaderboard() {

    return {
        leaderboard: [
            {'user': 'alan', 'last_access': '1555599990', 'correct_answers': 10, 'incorrect_answers': 15},
            {'user': 'alan', 'last_access': '1555599990', 'correct_answers': 10, 'incorrect_answers': 15},
            {'user': 'alan', 'last_access': '1555599990', 'correct_answers': 10, 'incorrect_answers': 15},
            {'user': 'alan', 'last_access': '1555599990', 'correct_answers': 10, 'incorrect_answers': 15},
            {'user': 'alan', 'last_access': '1555599990', 'correct_answers': 10, 'incorrect_answers': 15}
        ]
    }
}
