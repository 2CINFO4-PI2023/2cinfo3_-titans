/* eslint-disable */
import * as moment from 'moment';

export const boards = [
    {
        id          : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        title       : 'Admin Dashboard',
        description : 'Roadmap for the new project',
        icon        : 'heroicons_outline:template',
        lastActivity: moment().startOf('day').subtract(1, 'day').toISOString(),
        members     : [
            '9c510cf3-460d-4a8c-b3be-bcc3db578c08',
            'baa88231-0ee6-4028-96d5-7f187e0f4cd5',
            '18bb18f3-ea7d-4465-8913-e8c9adf6f568'
        ]
    },
    {
        id          : '0168b519-3dab-4b46-b2ea-0e678e38a583',
        title       : 'Weekly Planning',
        description : 'Job related tasks for the week',
        icon        : 'heroicons_outline:calendar',
        lastActivity: moment().startOf('day').subtract(2, 'days').toISOString(),
        members     : [
            '79ebb9ee-1e57-4706-810c-03edaec8f56d',
            '319ecb5b-f99c-4ee4-81b2-3aeffd1d4735',
            '5bf7ed5b-8b04-46b7-b364-005958b7d82e',
            'd1f612e6-3e3b-481f-a8a9-f917e243b06e',
            'fe0fec0d-002b-406f-87ab-47eb87ba577c',
            '23a47d2c-c6cb-40cc-af87-e946a9df5028',
            '6726643d-e8dc-42fa-83a6-b4ec06921a6b',
            '0d1eb062-13d5-4286-b8d4-e0bea15f3d56'
        ]
    },
    {
        id          : 'bc7db965-3c4f-4233-abf5-69bd70c3c175',
        title       : 'Personal Tasks',
        description : 'Personal tasks around the house',
        icon        : 'heroicons_outline:home',
        lastActivity: moment().startOf('day').subtract(1, 'week').toISOString(),
        members     : [
            '6f6a1c34-390b-4b2e-97c8-ff0e0d787839'
        ]
    }
];
export const lists = [
    {
        id      : '64b726b7b7330f0d7ec2b080',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        position: 65536,
        title   : 'New Reclamation'
    },
    {
        id      : '64b726f0b7330f0d7ec2b082',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        position: 131072,
        title   : 'In progress'
    },
    {
        id      : '64b72704b7330f0d7ec2b084',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        position: 262144,
        title   : 'Completed'
    },
    
        {
        id: '64b7271fb7330f0d7ec2b086',
        boardId: '2c82225f-2a6c-45d3-b18a-1132712a4234',
        position: 393216,
        title: 'Rejected'
        },
        {
        id: '64b7272cb7330f0d7ec2b088',
        boardId: '2c82225f-2a6c-45d3-b18a-1132712a4234',
        position: 458752,
        title: 'On Hold'
        }
];
export const cards = [
    {
        id         : '64b73507b7330f0d7ec2b08b',
        boardId    : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId     : '64b726b7b7330f0d7ec2b080',
        position   : 65536,
        title      : 'Example that showcase all of the available bits on the card with a fairly long title compared to other cards',
        description: '',
        labels     : [
            'e0175175-2784-48f1-a519-a1d2e397c9b3',
            '51779701-818a-4a53-bc16-137c3bd7a564',
            'e8364d69-9595-46ce-a0f9-ce428632a0ac',
            'caff9c9b-a198-4564-b1f4-8b3df1d345bb',
            'f9eeb436-13a3-4208-a239-0d555960a567'
        ],
        dueDate    : moment().subtract(10, 'days').startOf('day').toISOString()
    },
    {
        id      : '64b7350ab7330f0d7ec2b08e',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : '64b726b7b7330f0d7ec2b080',
        position: 131072,
        title   : 'Do a research about most needed admin applications',
        labels  : [
            'e0175175-2784-48f1-a519-a1d2e397c9b3'
        ],
        dueDate : null
    },
    {
        id      : '64b7350eb7330f0d7ec2b091',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : '64b726b7b7330f0d7ec2b080',
        position: 196608,
        title   : 'Implement the Project dashboard',
        labels  : [
            'caff9c9b-a198-4564-b1f4-8b3df1d345bb'
        ],
        dueDate : moment().startOf('day').toISOString()
    },
    {
        id      : '64b73529b7330f0d7ec2b094',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : '64b726b7b7330f0d7ec2b080',
        position: 262144,
        title   : 'Implement the Analytics dashboard',
        labels  : [
            'caff9c9b-a198-4564-b1f4-8b3df1d345bb'
        ],
        dueDate : moment().subtract(1, 'day').startOf('day').toISOString()
    },
    {
        id      : '64b7352db7330f0d7ec2b097',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : 'In progress',
        position: 65536,
        title   : 'Analytics dashboard design',
        labels  : [
            'e8364d69-9595-46ce-a0f9-ce428632a0ac'
        ],
        dueDate : null
    },
    {
        id      : '64b827094da0f65c781c6dff',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : 'In progress',
        position: 131072,
        title   : 'Project dashboard design',
        labels  : [
            'e8364d69-9595-46ce-a0f9-ce428632a0ac'
        ],
        dueDate : null
    },
    {
        id      : '64b827094da0f65c781c6dff',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : 'a85ea483-f8f7-42d9-a314-3fed6aac22ab',
        position: 65536,
        title   : 'JWT Auth implementation',
        labels  : [
            'caff9c9b-a198-4564-b1f4-8b3df1d345bb'
        ],
        dueDate : null
    },
    {
        id      : '532c2747-be79-464a-9897-6a682bf22b64',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : '64b726b7b7330f0d7ec2b080',
        position: 65536,
        title   : 'Create low fidelity wireframes',
        labels  : [],
        dueDate : null
    },
    {
        id      : '1d908efe-c830-476e-9e87-d06e30d89bc2',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : '64b726b7b7330f0d7ec2b080',
        position: 131072,
        title   : 'Create high fidelity wireframes',
        labels  : [],
        dueDate : moment().subtract(10, 'day').startOf('day').toISOString()
    },
    {
        id      : '64b7352db7330f0d7ec2b097',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : '64b726b7b7330f0d7ec2b080',
        position: 196608,
        title   : 'Collect information about most used admin layouts',
        labels  : [
            'e0175175-2784-48f1-a519-a1d2e397c9b3'
        ],
        dueDate : null
    },
    {
        id      : '3b7f3ceb-107f-42bc-a204-c268c9a56cb4',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : '64b726b7b7330f0d7ec2b080',
        position: 262144,
        title   : 'Do a research about latest UI trends',
        labels  : [
            'e0175175-2784-48f1-a519-a1d2e397c9b3'
        ],
        dueDate : null
    },
    {
        id      : 'cd7f01c5-a941-4076-8cef-37da0354e643',
        boardId : '2c82225f-2a6c-45d3-b18a-1132712a4234',
        listId  : '64b726b7b7330f0d7ec2b080',
        position: 327680,
        title   : 'Learn more about UX',
        labels  : [
            'e0175175-2784-48f1-a519-a1d2e397c9b3'
        ],
        dueDate : null
    }
];
export const labels = [{
    id: 'e0175175-2784-48f1-a519-a1d2e397c9b3',
    boardId: '2c82225f-2a6c-45d3-b18a-1132712a4234',
    title: 'Quality Issue'
    },
    {
    id: '51779701-818a-4a53-bc16-137c3bd7a564',
    boardId: '2c82225f-2a6c-45d3-b18a-1132712a4234',
    title: 'Wrong Ingredient'
    },
    {
    id: 'e8364d69-9595-46ce-a0f9-ce428632a0ac',
    boardId: '2c82225f-2a6c-45d3-b18a-1132712a4234',
    title: 'Damaged Packaging'
    },
    {
    id: 'caff9c9b-a198-4564-b1f4-8b3df1d345bb',
    boardId: '2c82225f-2a6c-45d3-b18a-1132712a4234',
    title: 'Incorrect Quantity'
    },
    {
    id: 'f9eeb436-13a3-4208-a239-0d555960a567',
    boardId: '2c82225f-2a6c-45d3-b18a-1132712a4234',
    title: 'Expired Product'
    }
    
    ];
export const members = [
    {
        id    : '6f6a1c34-390b-4b2e-97c8-ff0e0d787839',
        name  : 'Angeline Vinson',
        avatar: 'assets/images/avatars/female-01.jpg'
    },
    {
        id    : '4ce4be48-c8c0-468d-9df8-ddfda14cdb37',
        name  : 'Roseann Greer',
        avatar: 'assets/images/avatars/female-02.jpg'
    },
    {
        id    : '9c510cf3-460d-4a8c-b3be-bcc3db578c08',
        name  : 'Lorraine Barnett',
        avatar: 'assets/images/avatars/female-03.jpg'
    },
    {
        id    : '7ec887d9-b01a-4057-b5dc-aaed18637cc1',
        name  : 'Middleton Bradford',
        avatar: 'assets/images/avatars/male-01.jpg'
    },
    {
        id    : '74975a82-addb-427b-9b43-4d2e03331b68',
        name  : 'Sue Hays',
        avatar: 'assets/images/avatars/female-04.jpg'
    },
    {
        id    : '18bb18f3-ea7d-4465-8913-e8c9adf6f568',
        name  : 'Keith Neal',
        avatar: 'assets/images/avatars/male-02.jpg'
    },
    {
        id    : 'baa88231-0ee6-4028-96d5-7f187e0f4cd5',
        name  : 'Wilkins Gilmore',
        avatar: 'assets/images/avatars/male-03.jpg'
    },
    {
        id    : '0d1eb062-13d5-4286-b8d4-e0bea15f3d56',
        name  : 'Baldwin Stein',
        avatar: 'assets/images/avatars/male-04.jpg'
    },
    {
        id    : '5bf7ed5b-8b04-46b7-b364-005958b7d82e',
        name  : 'Bobbie Cohen',
        avatar: 'assets/images/avatars/female-05.jpg'
    },
    {
        id    : '93b1a72b-e2db-4f77-82d6-272047433508',
        name  : 'Melody Peters',
        avatar: 'assets/images/avatars/female-06.jpg'
    },
    {
        id    : 'd1f612e6-3e3b-481f-a8a9-f917e243b06e',
        name  : 'Marquez Ryan',
        avatar: 'assets/images/avatars/male-05.jpg'
    },
    {
        id    : '79ebb9ee-1e57-4706-810c-03edaec8f56d',
        name  : 'Roberta Briggs',
        avatar: 'assets/images/avatars/female-07.jpg'
    },
    {
        id    : '6726643d-e8dc-42fa-83a6-b4ec06921a6b',
        name  : 'Robbie Buckley',
        avatar: 'assets/images/avatars/female-08.jpg'
    },
    {
        id    : '8af617d7-898e-4992-beda-d5ac1d7ceda4',
        name  : 'Garcia Whitney',
        avatar: 'assets/images/avatars/male-06.jpg'
    },
    {
        id    : 'bcff44c4-9943-4adc-9049-08b1d922a658',
        name  : 'Spencer Pate',
        avatar: 'assets/images/avatars/male-07.jpg'
    },
    {
        id    : '54160ca2-29c9-4475-88a1-31a9307ad913',
        name  : 'Monica Mcdaniel',
        avatar: 'assets/images/avatars/female-09.jpg'
    },
    {
        id    : '51286603-3a43-444e-9242-f51fe57d5363',
        name  : 'Mcmillan Durham',
        avatar: 'assets/images/avatars/male-08.jpg'
    },
    {
        id    : '319ecb5b-f99c-4ee4-81b2-3aeffd1d4735',
        name  : 'Jeoine Hebert',
        avatar: 'assets/images/avatars/female-10.jpg'
    },
    {
        id    : 'fe0fec0d-002b-406f-87ab-47eb87ba577c',
        name  : 'Susanna Kline',
        avatar: 'assets/images/avatars/female-11.jpg'
    },
    {
        id    : '23a47d2c-c6cb-40cc-af87-e946a9df5028',
        name  : 'Suzette Singleton',
        avatar: 'assets/images/avatars/female-12.jpg'
    }
];
