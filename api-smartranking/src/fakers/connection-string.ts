export class ConnectionString {
  public static get(): string {
    return process.env.MONGODB || 'mongodb://root:root@localhost:27017/smartranking?authSource=admin&directConnection=true';   
  }
}
