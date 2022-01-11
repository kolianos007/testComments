const initialState = {
    profile: {
        name: "Kolya Evtushenko",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp3DxP80ArpRzsB0XWBG9Ow5GeuefbLrUHw&usqp=CAU",
    }
}

type InitialState = typeof initialState

const profile = (state = initialState, action: any): InitialState => {
    return state
}

export default profile