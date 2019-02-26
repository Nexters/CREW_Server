import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  info: {
    title: 'Crew API Document',
    version: '1.0.0',
    description: 'Crew Server API Document'
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { jwt: [] }
  ],
  host: `localhost:${process.env.PORT}`,
  basePath: '/',
  components: {
    res: {
      BadRequest: {
        description: '잘못된 요청.',
        schema: {
          $ref: `#/components/errorResult/Error`
        }
      },
      Forbidden: {
        description: '권한이 없다.',
        schema: {
          $ref: `#/components/errorResult/Error`
        }
      },
      NotFound: {
        description: '없는 리소스 요청.',
        schema: {
          $ref: `#/components/errorResult/Error`
        }
      } 
    },
    errorResult: {
      Error: {
        type: 'object',
        properties: {
          errMsg: {
            type: 'string',
            description: 'send error message'
          }
        }
      }
    }    
  },
  definitions: {
    'User': {
      type: 'object',
      properties: {
        id: {
          type: 'number'
        },
        name: {
          type: 'string'
        },
        member_provider: {
          type: 'string'
        },
        member_provider_number: {
          type: 'string'
        },
        age: {
          type: 'number'
        },
        phone_number: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        job: {
          type: 'JobType'
        },
        position: {
          type: 'PositionType'
        },
        provide_image: {
          type: 'string'
        },
        status: {
          type: 'ApplicantStatus'
        },
        token: {
          type: 'string'
        },
        created_at: {
          type: 'date'
        },
        updated_at: {
          type: 'date'
        }
      }
    }
  }
}

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['**/*.ts']
}

export const swaggerSpec = swaggerJSDoc(options);