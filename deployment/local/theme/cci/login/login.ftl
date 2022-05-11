<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
       ${msg("loginAccountTitle")} 
    <#elseif section = "form">
    <div id="kc-form">
		<div id="kc-form-wrapper">
			<#if realm.password>
				<form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
					<div class="form-floating mb-3">
						<#if usernameEditDisabled??>
							<input class="form-control" tabindex="1" id="username" name="username" value="${(login.username!'')}" placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>" type="text" disabled />
						<#else>
							<input class="form-control" tabindex="1" id="username" name="username" value="${(login.username!'')}" placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>" type="text" autofocus autocomplete="off"
								   aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
							/>
							<#if messagesPerField.existsError('username','password')>
								<div class="mt-2 alert alert-danger" role="alert" id="input-error" aria-live="polite">
										${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
								</div>
							</#if>
						</#if>
						<label for="username"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
					</div>

					<div class="form-floating mb-3">
						<input class="form-control" tabindex="2" id="password" name="password" placeholder="${msg("password")}" type="password" autocomplete="off"
							   aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
						/>
						<label for="password">${msg("password")}</label>
					</div>

					<div class="form-check mb-3 custom-control custom-checkbox" id="kc-form-options">
						<#if realm.rememberMe && !usernameEditDisabled??>
							<label class="form-check-label">${msg("rememberMe")}</label>
							<#if login.rememberMe??>
								<input class="form-check-input custom-control-input" tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked>
							<#else>
								<input class="form-check-input custom-control-input" tabindex="3" id="rememberMe" name="rememberMe" type="checkbox">
							</#if>
						</#if>
						<div id="rememberMeWarning" style="display:none">
						Durch das Auswählen der "Angemeldet bleiben" - Funktion stimmen Sie der Verwendung von persistenten Cookies zu. Verwenden Sie diese Option nur auf einem Rechner dem Sie vertrauen. 
						</div>
					</div>

					<div class="d-grid" id="kc-form-buttons">
						<input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
						<button class="btn btn-primary btn-login fw-bold" tabindex="4" name="login" id="kc-login-btn-custom" type="submit">${msg("doLogIn")}</button>
						
						<#if realm.resetPasswordAllowed>
							<a class="mt-2" tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
						</#if>
					</div>
				</form>
			</#if>
        </div>

        <#if realm.password && social.providers??>
            <div id="kc-social-providers">
                <hr class="my-4">
                <h5 class="card-title text-center">${msg("identity-provider-login-label")}</h5>

                <div class="d-grid gap-2">
                    <#list social.providers as p>
                        <button id="social-${p.alias}" class="btn btn-secondary" type="button"
                                type="button" href="${p.loginUrl}">
                                <span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                        </button>
                    </#list>
                </div>
            </div>
        </#if>

    </div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span>${msg("noAccount")} <a tabindex="6" href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                </div>
            </div>
        </#if>
    </#if>

</@layout.registrationLayout>