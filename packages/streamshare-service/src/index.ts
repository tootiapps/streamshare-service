/**
 * Class representing a search result.
 */
export class StreamShareResult {
    /**
     * Episode number if the media is a TV series.
     */
    episode?: number;
    
    /** File name of the result. */
    filename: string;
    
    /** Last played timestamp. */
    lastPlayedAt?: string;
    
    /**
     * Season number if the media is a TV series.
     */
    season?: number;
    
    /**
     * TMDB episode identifier.
     */
    tmdbEpisodeID?: number;
    
    /** TMDB ID of the result (optional). */
    tmdbID?: number;
    
    /** Type of the media: "movie," "tvShow," or "unclassified." */
    type?: "movie" | "tvShow" | "unclassified";
    
    /** URL of the result. */
    url: string;

    constructor(result: StreamShareResult) {
        this.episode = result.episode;
        this.filename = result.filename;
        this.lastPlayedAt = result.lastPlayedAt;
        this.season = result.season;
        this.tmdbEpisodeID = result.tmdbEpisodeID;
        this.tmdbID = result.tmdbID;
        this.type = result.type;
        this.url = result.url;
    }
}

export interface StreamShareResponse {
    items: StreamShareResult[];
    
    pagination?: {
        /** Current page for pagination. */
        currentPage: number;
        
        /** Number of items per page. Should not exceed 100 items per page for better performance. */
        itemsPerPage: number;
        
        /** Length of the page. */
        pageLength: number;
    };
}

/**
 * Base interface for parameters.
 */
interface ParamBase {
    /** Parameter description. */
    description: string;
    
    /** Indicates if the parameter is hidden (optional). */
    hidden?: boolean;
    
    /** Parameter ID. */
    id: string;
    
    /** Parameter label. */
    label: string;
}

/**
 * Interface extending ParamBase for text-type parameters.
 */
interface ParamText extends ParamBase {
    /** Parameter type: text. */
    type: 'text';
}

/**
 * Interface extending ParamBase for select-type parameters.
 */
interface ParamSelect extends ParamBase {
    /** Indicates if multiple selections are allowed (optional). */
    multiple?: boolean;
    options: {
        /** Option label. */
        label: string;
        
        /** Option value. */
        value: string;
    }[];
    /** Parameter type: select. */
    type: 'select';
}

/** Parameters. */
type Param = ParamText | ParamSelect;

/**
 * Interface describing an API endpoint.
 */
interface APIEndpoint {
    /** Label of the API endpoint. */
    label: string;
    
    /** HTTP method used: "POST" or "GET". */
    method: "POST" | "GET";
    
    /** List of parameters. */
    params: Param[];
    
    /** 
     * Represents the path to your access point.
     * For example, if your service has a base URL of http://myservice.com and you want to create an API endpoint for searching at http://myservice.com/search, the path should be "/search."
     */
    pathname: string;
}

/**
 * Class representing a stream sharing service.
 * These are the main data that StreamShare needs to obtain when querying your service's main URL.
 */
export class StreamShareService {
    /** List of supported API endpoints. */
    api: APIEndpoint[] = [];
    
    /**
     * If authentication is required to access your service, specify the authentication method:
     * - `basic` requests a username and password from the user to access your service. These credentials are then included in the headers of calls to your service. Example: "Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l"
     * - `apikey` requests a key from the user to access your service. This key is added as a URL parameter "apikey" in each request.
     */
    auth?: {
        method: "basic" | "apikey";
    };
    
    /** Service description. */
    description?: string;
    
    /** Path to your logo. */
    logoPath?: string;
    
    /** Service name. */
    name: string;

    constructor(config: StreamShareService) {
        this.name = config.name;
        this.description = config.description;
        this.api = config.api;
        this.auth = config.auth;
        this.logoPath = config.logoPath;
    }
}
