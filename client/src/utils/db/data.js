export const POSTS = [
    {
        _id: "1",
        text: "Amazing Study Group Today!!",
        img: "/posts/post7.png",
        user: {
            username: "oceanlover22",
            profileImg: "/avatars/boy1.png",
            fullName: "Marina Fisher",
        },
        comments: [
            {
                _id: "1",
                text: "Absolutely stunning!",
                user: {
                    username: "beachcomber45",
                    profileImg: "/avatars/boy2.png",
                    fullName: "Sandy Shore",
                },
            },
        ],
        likes: ["1234abc", "5678def", "9012ghi"],
    },
    {
        _id: "2",
        text: "Who's going to the party at VietSoc today?",
        user: {
            username: "chefextraordinaire",
            profileImg: "/avatars/boy2.png",
            fullName: "Gordon Ramsay",
        },
        comments: [],
        likes: ["abcd123", "efgh456"],
    },
    {
        _id: "3",
        text: "The Best!",
        img: "/posts/post8.png",
        user: {
            username: "outdooradventurer",
            profileImg: "/avatars/girl2.png",
            fullName: "Alex Woods",
        },
        comments: [
            {
                _id: "1",
                text: "What a gorgeous view!",
                user: {
                    username: "naturelover123",
                    profileImg: "/avatars/boy3.png",
                    fullName: "Emma Green",
                },
            },
            {
                _id: "2",
                text: "Wish I was there!",
                user: {
                    username: "trailblazer89",
                    profileImg: "/avatars/girl1.png",
                    fullName: "Jake Summit",
                },
            },
        ],
        likes: ["wxyz789"],
    },
];

export const USERS_FOR_RIGHT_PANEL = [
    {
        _id: "1",
        fullName: "Marina Fisher",
        username: "oceanlover22",
        profileImg: "/avatars/boy1.png",
    },
    {
        _id: "2",
        fullName: "Sandy Shore",
        username: "beachcomber45",
        profileImg: "/avatars/boy2.png",
    },
    {
        _id: "3",
        fullName: "Gordon Ramsay",
        username: "chefextraordinaire",
        profileImg: "/avatars/boy3.png",
    },
    {
        _id: "4",
        fullName: "Alex Woods",
        username: "outdooradventurer",
        profileImg: "/avatars/girl1.png",
    },
    {
        _id: "5",
        fullName: "Emma Green",
        username: "naturelover123",
        profileImg: "/avatars/girl2.png",
    },
    {
        _id: "6",
        fullName: "Jake Summit",
        username: "trailblazer89",
        profileImg: "/avatars/girl3.png",
    },
];
