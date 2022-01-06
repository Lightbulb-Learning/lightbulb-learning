/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/challenge_pools": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.challenge_pools.id"];
          description?: parameters["rowFilter.challenge_pools.description"];
          owner?: parameters["rowFilter.challenge_pools.owner"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["challenge_pools"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** challenge_pools */
          challenge_pools?: definitions["challenge_pools"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.challenge_pools.id"];
          description?: parameters["rowFilter.challenge_pools.description"];
          owner?: parameters["rowFilter.challenge_pools.owner"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.challenge_pools.id"];
          description?: parameters["rowFilter.challenge_pools.description"];
          owner?: parameters["rowFilter.challenge_pools.owner"];
        };
        body: {
          /** challenge_pools */
          challenge_pools?: definitions["challenge_pools"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/open_questions": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.open_questions.id"];
          questionText?: parameters["rowFilter.open_questions.questionText"];
          challenge_pool?: parameters["rowFilter.open_questions.challenge_pool"];
          owner?: parameters["rowFilter.open_questions.owner"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["open_questions"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** open_questions */
          open_questions?: definitions["open_questions"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.open_questions.id"];
          questionText?: parameters["rowFilter.open_questions.questionText"];
          challenge_pool?: parameters["rowFilter.open_questions.challenge_pool"];
          owner?: parameters["rowFilter.open_questions.owner"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.open_questions.id"];
          questionText?: parameters["rowFilter.open_questions.questionText"];
          challenge_pool?: parameters["rowFilter.open_questions.challenge_pool"];
          owner?: parameters["rowFilter.open_questions.owner"];
        };
        body: {
          /** open_questions */
          open_questions?: definitions["open_questions"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  challenge_pools: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /** Format: text */
    description: string;
    /** Format: uuid */
    owner: string;
  };
  open_questions: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /** Format: text */
    questionText: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `challenge_pools.id`.<fk table='challenge_pools' column='id'/>
     */
    challenge_pool: string;
    /** Format: uuid */
    owner: string;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: text */
    username?: string;
    /** Format: text */
    avatar_url?: string;
    /** Format: text */
    website?: string;
  };
}

export interface parameters {
  /** @description Preference */
  preferParams: "params=single-object";
  /** @description Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** @description Preference */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description challenge_pools */
  "body.challenge_pools": definitions["challenge_pools"];
  /** Format: uuid */
  "rowFilter.challenge_pools.id": string;
  /** Format: text */
  "rowFilter.challenge_pools.description": string;
  /** Format: uuid */
  "rowFilter.challenge_pools.owner": string;
  /** @description open_questions */
  "body.open_questions": definitions["open_questions"];
  /** Format: uuid */
  "rowFilter.open_questions.id": string;
  /** Format: text */
  "rowFilter.open_questions.questionText": string;
  /** Format: uuid */
  "rowFilter.open_questions.challenge_pool": string;
  /** Format: uuid */
  "rowFilter.open_questions.owner": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string;
  /** Format: text */
  "rowFilter.profiles.username": string;
  /** Format: text */
  "rowFilter.profiles.avatar_url": string;
  /** Format: text */
  "rowFilter.profiles.website": string;
}

export interface operations {}

export interface external {}