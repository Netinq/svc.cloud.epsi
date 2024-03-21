import { withSwagger } from 'next-swagger-doc';

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: All comments endpoints
 *   - name: Movie
 *     description: All movies endpoints
 * 
 */
const swaggerHandler = withSwagger({
    apiFolder: 'pages/api',
    definition: {
        info: {
            title: 'BrowserStack Demo API',
            version: '1.0.0',
        },
        openapi: '3.0.0',
    },

});

export default swaggerHandler();