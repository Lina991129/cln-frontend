import {UserType} from "../models/user";

let currentUser: UserType;

const setCurrentUserState = (user: UserType) => { //(user: UserType) 表示函数参数 user 应该是一个 UserType 类型的对象。
    currentUser = user;
}


const getCurrentUserState = () : UserType => { //(): UserType 表示该函数没有参数，返回值的类型应该是 UserType 类型的对象。
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}
