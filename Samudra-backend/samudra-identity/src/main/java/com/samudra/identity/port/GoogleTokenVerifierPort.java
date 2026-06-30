package com.samudra.identity.port;

import com.samudra.identity.port.model.GoogleUserInfo;

public interface GoogleTokenVerifierPort {

    GoogleUserInfo verifyIdToken(String idToken);
}
