"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
        'JobType': {
            type: 'object',
            properties: {
                Student: {
                    type: 'string',
                    value: 'Student'
                },
                Prepare: {
                    type: 'string',
                    value: 'Prepare'
                },
                Worker: {
                    type: 'string',
                    value: 'Worker'
                }
            }
        },
        'PositionType': {
            type: 'object',
            properties: {
                Developer: {
                    type: 'string',
                    value: 'Developer'
                },
                Designer: {
                    type: 'string',
                    value: 'Designer'
                }
            }
        },
        'ApplicantStatus': {
            type: 'object',
            properties: {
                Applicant: {
                    type: 'string',
                    value: 'Applicant'
                },
                PaperPass: {
                    type: 'string',
                    value: 'PaperPass'
                },
                InterviewPass: {
                    type: 'string',
                    value: 'InterviewPass'
                },
                Fail: {
                    type: 'string',
                    value: 'Fail'
                },
                Admin: {
                    type: 'string',
                    value: 'Admin'
                }
            }
        },
        'FormType': {
            type: 'object',
            properties: {
                Short_Answer: {
                    type: 'string',
                    value: 'Short_Answer'
                },
                Long_Answer: {
                    type: 'string',
                    value: 'Long_Answer'
                },
                Selector: {
                    type: 'string',
                    value: 'Selector'
                },
                Upload: {
                    type: 'string',
                    value: 'Upload'
                }
            }
        },
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
                    type: 'JobType',
                    $ref: '#/definitions/JobType'
                },
                position: {
                    type: 'PositionType',
                    $ref: '#/definitions/PositionType'
                },
                provide_image: {
                    type: 'string'
                },
                status: {
                    type: 'ApplicantStatus',
                    $ref: '#/definitions/ApplicantStatus'
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
        },
        'Resume': {
            type: 'object',
            properties: {
                id: {
                    type: 'number'
                },
                answer: {
                    type: 'string'
                },
                created_at: {
                    type: 'date'
                },
                updated_at: {
                    type: 'date'
                }
            }
        },
        'Form': {
            type: 'object',
            properties: {
                id: {
                    type: 'number'
                },
                position: {
                    type: 'PositionType',
                    $ref: '#/definitions/PositionType'
                },
                question_num: {
                    type: 'number'
                },
                description: {
                    type: 'string'
                },
                options: {
                    type: 'string'
                },
                type: {
                    type: 'FormType',
                    $ref: '#/definitions/FormType'
                },
                created_at: {
                    type: 'date'
                },
                updated_at: {
                    type: 'date'
                }
            }
        }, 'Evaluation': {
            type: 'object',
            properties: {
                id: {
                    type: 'number'
                },
                score: {
                    type: 'number'
                },
                comment: {
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
};
const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['**/*.ts']
};
exports.swaggerSpec = swagger_jsdoc_1.default(options);
//# sourceMappingURL=swagger.js.map