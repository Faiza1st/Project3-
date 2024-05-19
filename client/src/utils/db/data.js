export const POSTS = [
    {
        _id: "1",
        text: "Amazing Study Group Today!!",
        img: "/posts/post7.png",
        user: {
            username: "oceanlover22",
            profileImg: "/avatars/boy1.png",
            fullName: "Marina Fisher",
            course: "Marine Biology",
            year: "Sophomore"
        },
        comments: [
            {
                _id: "1",
                text: "Absolutely stunning!",
                user: {
                    username: "beachcomber45",
                    profileImg: "/avatars/boy2.png",
                    fullName: "Sandy Shore",
                    course: "Environmental Science",
                    year: "Freshman"
                },
            },
        ],
        likes: ["1234abc", "5678def", "9012ghi"],
        timestamp: "2024-05-18T14:23:00Z",
    },
    {
        _id: "2",
        text: "Who's going to the party at VietSoc today?",
        user: {
            username: "chefextraordinaire",
            profileImg: "/avatars/boy2.png",
            fullName: "Gordon Ramsay",
            course: "Culinary Arts",
            year: "Senior"
        },
        comments: [],
        likes: ["abcd123", "efgh456"],
        timestamp: "2024-05-18T12:47:00Z",
    },
    {
        _id: "3",
        text: "The Best!",
        img: "/posts/post8.png",
        user: {
            username: "outdooradventurer",
            profileImg: "/avatars/girl2.png",
            fullName: "Alex Woods",
            course: "Outdoor Recreation",
            year: "Junior"
        },
        comments: [
            {
                _id: "1",
                text: "What a gorgeous view!",
                user: {
                    username: "naturelover123",
                    profileImg: "/avatars/boy3.png",
                    fullName: "Emma Green",
                    course: "Botany",
                    year: "Sophomore"
                },
            },
            {
                _id: "2",
                text: "Wish I was there!",
                user: {
                    username: "trailblazer89",
                    profileImg: "/avatars/girl1.png",
                    fullName: "Jake Summit",
                    course: "Geology",
                    year: "Junior"
                },
            },
        ],
        likes: ["wxyz789"],
        timestamp: "2024-05-17T17:35:00Z",
    },
];

export const USERS_FOR_RIGHT_PANEL = [
    {
        _id: "1",
        fullName: "Marina Fisher",
        username: "oceanlover22",
        profileImg: "/avatars/boy1.png",
        course: "Marine Biology",
        year: "Sophomore"
    },
    {
        _id: "2",
        fullName: "Sandy Shore",
        username: "beachcomber45",
        profileImg: "/avatars/boy2.png",
        course: "Environmental Science",
        year: "Freshman"
    },
    {
        _id: "3",
        fullName: "Gordon Ramsay",
        username: "chefextraordinaire",
        profileImg: "/avatars/boy3.png",
        course: "Culinary Arts",
        year: "Senior"
    },
    {
        _id: "4",
        fullName: "Alex Woods",
        username: "outdooradventurer",
        profileImg: "/avatars/girl1.png",
        course: "Outdoor Recreation",
        year: "Junior"
    },
    {
        _id: "5",
        fullName: "Emma Green",
        username: "naturelover123",
        profileImg: "/avatars/girl2.png",
        course: "Botany",
        year: "Sophomore"
    },
    {
        _id: "6",
        fullName: "Jake Summit",
        username: "trailblazer89",
        profileImg: "/avatars/girl3.png",
        course: "Geology",
        year: "Junior"
    },
];
