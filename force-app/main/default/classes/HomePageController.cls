public without sharing class HomePageController {
    @AuraEnabled
    public static string getPhotoUrl(){
        try {
            String data;
            List<Document> docs = [SELECT Id FROM Document WHERE DeveloperName = 'profile_photo'];
            String photoUrl = Site.getBaseUrl() + '/servlet/servlet.ImageServer?id=' + docs[0].Id + '&oid=' + UserInfo.getOrganizationId();
            return photoUrl;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}