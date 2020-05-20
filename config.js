const config = {
    mongodb_url: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0-vute7.gcp.mongodb.net`,
    dbName: 'openalpr',
    rawDataCol: 'raw',
    
    prowlApiUrl: 'https://api.prowlapp.com/publicapi/add'
};

module.exports = config;