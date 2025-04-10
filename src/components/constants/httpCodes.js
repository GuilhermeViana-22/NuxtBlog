export const HTTP_CODES = {
    // Sucesso
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
  
    // Redirecionamento
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,
  
    // Erros do cliente
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    VALIDATION_ERROR: 422,
  
    // Erros do servidor
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
  }
  
  export const HTTP_MESSAGES = {
    400: 'Requisição inválida',
    401: 'Não autorizado',
    403: 'Acesso proibido',
    404: 'Recurso não encontrado',
    500: 'Erro interno do servidor',
    // Adicione outras mensagens conforme necessário
  }