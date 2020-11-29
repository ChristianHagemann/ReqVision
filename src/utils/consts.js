export const DIRECTORY_PATH = '/reqvision/';

export const HTTPS = 'https://';
export const COMPUTER_VISION = '/vision/v3.0/read/analyze';
export const ANALYZE_LANGUAGE = '?language=';
export const DE_KEY = 'de';
export const HORIZONTAL = 'horizontal';
export const VERTICAL = 'vertical';
export const GITLAB_API = '/api/v4/projects/';
export const GITLAB_ISSUES = '/issues';
export const GITLAB_COMMENTS = '/notes';
export const GITLAB_UPLOADS = '/uploads';
export const ASANA_API = 'https://app.asana.com/api/1.0';
export const ASANA_PROJECTS = '/projects';
export const ASANA_TASKS = '/tasks';
export const ASANA_COMMENT = '/stories';

export const RESP_SUCCEEDED = 'succeeded';

export const STATUS_RESIZING_IMAGE = 'resizing image...';
export const STATUS_PRE_PROCESSING_IMAGE = 'pre-processing image...';
export const STATUS_SENDING_IMAGE = 'sending image...';
export const STATUS_GET_RESULT_TEXT = 'fetching result text...';
export const STATUS_TRYING_REQUEST = 'trying...';
export const STATUS_FETCHING_ISSUES = 'fetching issues';
export const STATUS_CREATING_GITLAB_ISSUE = 'creating gitlab issue...';
export const STATUS_COMMENTING_ON_ISSUE = 'commenting on issue...';
export const STATUS_CREATING_ASANA_TASK = 'creating asana task...';
export const STATUS_COMMENTING_ON_TASK = 'commenting on task...';
export const STATUS_UPLOADING_IMAGE = 'uploading image...';

/**
 * static route strings for navigation
 */
export const ROUTES = {
	CAMERA: 'ROUTE_CAMERA',
	EDIT: 'ROUTE_EDIT',
	EVENTS: 'ROUTE_EVENTS',
	RESULTS: 'ROUTE_RESULTS',
	SETTINGS: 'ROUTE_SETTINGS',
};

/**
 * types for segments
 */
export const TYPES = {
	IMAGE: 'IMAGE',
	TEXT: 'TEXT',
};

/**
 * keys used in various objects
 */
export const KEYS = {
	SOURCE: 'source',
	TEXT: 'text',
	TITLE: 'title',
	STATUS: 'status',
	WIDTH: 'width',
	HEIGHT: 'height',
};

export const SHARING_STRINGS = {
	ASANA: 'Asana',
	GITLAB: 'Gitlab',
	NEW: 'NEW',
	COMMENT: 'COMMENT',
	EMAIL: 'Email',
};

/**
 * list platforms to share for sharing dropdowns
 */
export const SHARING_PLATFORMS = [
	{label: SHARING_STRINGS.ASANA, value: SHARING_STRINGS.ASANA},
	{label: SHARING_STRINGS.GITLAB, value: SHARING_STRINGS.GITLAB},
	{label: SHARING_STRINGS.EMAIL, value: SHARING_STRINGS.EMAIL},
];

/**
 * different sharing platforms have different operations to perform
 * enter their key for translation here
 */
export const SHARING_OPERATIONS = {
	[SHARING_STRINGS.ASANA]: [
		{value: SHARING_STRINGS.NEW, label: 'NEW_TASK'},
		{value: SHARING_STRINGS.COMMENT, label: 'COMMENT_TASK'},
	],
	[SHARING_STRINGS.GITLAB]: [
		{value: SHARING_STRINGS.NEW, label: 'NEW_ISSUE'},
		{value: SHARING_STRINGS.COMMENT, label: 'COMMENT_ISSUE'},
	],
};

/**
 * result status messages
 */
export const RESULT_STATUS = {
	PRE_PROCESSING_ERROR: 'error pre processing',
	RECOGNITION_ERROR: 'error recognizing',
	TEXT_FETCHING_ERROR: 'error fetching result',
	UPLOAD_ERROR: 'error uploading',
	SUCCESS_RESULT: 'success adding to results',
	UPLOADED: 'success uploaded',
	MARKED_DONE: 'success marked done',
};
