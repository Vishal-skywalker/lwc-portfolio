public with sharing class TOTPController {
    @AuraEnabled
    public static string getRegistrationURL(String key, String accountName){
        String url;
        try {
            url = new TOTP.KeyURI(key, accountName, 'TOTP, Inc').getURL();
        } catch (Exception e) {
            throw new AuraHandledException(e.toString());
        }
        return url;
    }
    
    @AuraEnabled
    public static Boolean verifyTOTP(String code, String key){
        try {
            // and the current time (in miliseconds, and as string)
            Long currentTime =  System.now().getTime();
            
            // Using the algorithm HMAC-SHA1
            String algo = 'hmacSha1';
            
            // And returning six digits for the user to confirm
            Integer digits = 6;
            return TOTP.generateCodes(key, currentTime, digits, algo).contains(code);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}