function VoteSessionManager(){
    this.clients = new Array();
    this.sessions = new Array();
}

VoteSessionManager.prototype.registerClient = function(clientData){
    var client = this.getClient(clientData.nickname)
    
    if(client == null)
        this.clients.push(clientData);
    else{
        this.clients.splice(this.clients.indexOf(client), 1);
        this.clients.push(clientData);
    }

    return clientData;
}
VoteSessionManager.prototype.getClient = function(nickname){
    return this.clients.find(x => x.nickname == nickname);
}
VoteSessionManager.prototype.getClients = function(){
    return this.clients;
}

VoteSessionManager.prototype.signIn = function(nickname, session){
    var signed = false;

    var client = this.getClient(nickname);
    var session = this.sessions.find(x => x.sessionCode == session);

    if(session != null && client == null)
        client = this.registerClient({'nickname' : nickname, 'sessionCode' : session});

    signed = client != null && session != null;

    return signed;
}

VoteSessionManager.prototype.registerSession = function (sessionCode, author) {
    var current = this.sessions.find(x => x.sessionCode == sessionCode);
    if(current == null){
        //throw new Error('Session code already exist.');
        this.sessions.push({
            'sessionCode' : sessionCode,
            'author' : author
        });
    }
}

module.exports = VoteSessionManager