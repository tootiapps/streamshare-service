import express from 'express'
import { StreamShareResponse, StreamShareService } from 'streamshare-service';
import cors from 'cors';
import url from 'url';

const app = express()
const port = 3000;
const baseURL = "localhost";

app.use(cors());
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const serviceUrl = `http://${baseURL}:${port}`

/**
 * Create an instance of StreamShareService with the specified configuration.
 */
const service = new StreamShareService({
    name: "My Great Service",
    description: "The best streaming service.",
    logoPath: url.resolve(serviceUrl, 'assets/Service-Symbol.png'),
    auth: {
        method: "basic"
    },
    api: [
        {
            label: "Search",
            method: "GET",
            pathname: "/search",
            params: [
                {
                    id: "q",
                    label: "Keyword",
                    description: "Allows passing a keyword",
                    type: "text",
                },
                {
                    id: "genre",
                    label: "Genre",
                    description: "Allows passing a genre filter",
                    type: "select",
                    options: [
                        {
                            label: "Horror",
                            value: "1",
                        },
                        {
                            label: "Action",
                            value: "2",
                        },
                    ],
                },
            ],
        },
        {
            label: "TOP 250",
            method: "GET",
            params: [],
            pathname: "/top-250"
        }
    ],
});

// Authorization Middleware
app.use((req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    console.log("authorizationHeader", authorizationHeader);
    next();
});

app.get('/', (req, res) => {
    res.json(service)
})

app.get('/assets', (req, res) => {
    res.send('Liste des fichiers du dossier "assets"');
});

app.get('/search', (req, res) => {
    const results: StreamShareResponse = {
        items: [{
            url: "http://mystreamservice.com/0",
            filename: "Avatar",
            tmdbID: 19995,
            type: "movie"
        },
        {
            url: "http://mystreamservice.com/1",
            filename: "Pirates of the Caribbean: At World's End",
            tmdbID: 285,
            type: "movie"
        },
        {
            url: "http://mystreamservice.com/2",
            filename: "Spectre",
            tmdbID: 206647,
            type: "movie"
        }],
        pagination: {
            currentPage: 2,
            pageLength: 100,
            itemsPerPage: 50
        }
    }
    res.json(results)
})


app.get('/top-250', (req, res) => {
    const results: StreamShareResponse = {
        items: [{
            url: "http://mystreamservice.com/0",
            filename: "Avatar",
            tmdbID: 19995,
            type: "movie"
        },
        {
            url: "http://mystreamservice.com/1",
            filename: "Pirates of the Caribbean: At World's End",
            tmdbID: 285,
            type: "movie"
        },
        {
            url: "http://mystreamservice.com/2",
            filename: "Spectre",
            tmdbID: 206647,
            type: "movie"
        }],
        pagination: {
            currentPage: 2,
            pageLength: 100,
            itemsPerPage: 50
        }
    }
    res.json(results)
})

app.listen(port, baseURL, () => {
    console.log(`Example app listening on port ${baseURL}:${port}`)
})