/**
 * the objects are handled in maps and passed from one reducer to the next depending on the current state
 * these interfaces defined how the objects look at different times during this process
 */

export interface projectReducer {
  active: string,
  details: boolean,
  projects: {
    projectKey: project
  }
}

export interface settingsReducer {
  global: {
    microsoftEndpoint: string,
    microsoftKey: string,
    preProcessing: boolean,
    themeName: string,
    theme: {},
  },
  projects: {
    projectKey: {
      asana: asanaSettings,
      gitlab: gitlabSettings
    }
  }
}

export interface imageReducer {
  image: image,
  projects: {
    projectKey: {
      imageKey: image
    }
  }
}

export interface recognizeReducer {
  loading: boolean,
  projects: {
    projectKey: {
      imageKey: {
        segmentKey: recognizeElement
      }
    }
  },
  recognizeQueue: {
    projectKey: number[]
  }
}

export interface resultReducer {
  projects: {
    projectKey: {
      key: string,
      text: string | null,
      type: 'IMAGE' | 'TEXT', // TODO needed?
      source: string,
      status: enum,
    }
  }
}




interface project {
  key: string,
  name: string,
  date: date,
}

interface asanaSettings {
  token: string,
  projectID: string,
}

interface gitlabSettings {
  token: string,
  location: string,
  projectID: string,
}

/**
 * right after an image was captured or selected
 */
export interface image {
  source: string,
  mode: Enumerator, // HANDWRITTEN or PRINTED // TODO vielleicht rausnehmen, weil irgendwie es egal
  width: number,
  height: number,
}

/**
 * object that is added to recQueue for recognition
 */
export interface recognizeElement {
  key: string,
  type: Enumerator, // TEXT or IMAGE
  mode: Enumerator,
  title: string | null, // manually given title
  source: string,
  width: number,
  height: number,
  rectangle: rectangle | null,
}

/**
 * object for display in result view after recognition took place
 */
export interface resultElement {
  key: {
    key: string,
    type: Enumerator,
    source: string,
    title: string | null, // manually given title
    text: string | null // recognized text; null if type is image
    status: Enumerator, // if successfully recognized or uploaded or if error occurred
    // TODO these should also be carried over for history later
    width: number,
    height: number,
    rectangle: rectangle | null,
  }
}

/**
 * rectangle to display on edit view
 */
interface rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
}

/**
 * payload for fetching the result text and setting successful result element
 */
export interface fetchTextPayload {
  apiKey: string,
  resultLocation: string,
  image: recognizeElement
}

/**
 * payload that is needed to recognize image from remote and fetch text
 */
export interface recognizePayload {
  apiKey: string,
  apiEndpoint: string,
  image: recognizeElement,
} // addResultElement with all for resultElement after recognition

// FROM HERE ON FORWARD WE ARE ONLY WORKING ON THE RESULTS MAP TODO turn into history map/queue
/**
 *
 */
export interface gitlabImageUpload {
  accessToken: string,
  repositoryLocation: string,
  projectID: string,
  source: string,
  next: {
    type: Enumerator, // NEW oder COMMENT
    key: string,
    payload: {
      title: string | null,
      description: string | null,
      comment: string | null,
      issueID: string | null,
    }
  }
}

/**
 * payload for creating a new issue on gitlab
 */
export interface gitlabNewPayload {
  accessToken: string,
  repositoryLocation: string,
  projectID: string,
  key: string,
  issue: {
    title: string,
    description: string | null
  },
}

/**
 * payload for commenting on an existing issue
 */
export interface gitlabCommentPayload {
  accessToken: string,
  repositoryLocation: string,
  projectID: string,
  issueID: string,
  key: string,
  comment: string
}

/**
 * payload for creating new asana tasks
 */
export interface asanaNewPayload {
  accessToken: string,
  projectID: string,
  key: string,
  task: {
    title: string,
    description: string,
  }
}

/**
 * payload for commenting on an asana task
 */
export interface asanaCommentPayload {
  accessToken: string,
  taskID: string,
  key: string,
  comment: string,
}
