<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header">
        ${msg("emailForgotTitle")}
    <#elseif section = "form">
        <form id="kc-reset-password-form" action="${url.loginAction}" method="post">
            <div class="form-floating mb-3">
                <input class="form-control" placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>" type="text" id="username" name="username" autofocus value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"/>
				<label for="username"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
				
                <#if messagesPerField.existsError('username')>
					<div class="alert alert-danger" id="input-error-username" aria-live="polite">${kcSanitize(messagesPerField.get('username'))?no_esc}</div>
				</#if>
            </div>
			<div class="mb-3">
                <div id="kc-form-options">
                    <div>
                        <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                    </div>
                </div>
            </div>

			<div class="d-grid" id="kc-form-buttons">
				<button class="btn btn-primary btn-login fw-bold" type="submit">${msg("doSubmit")}</button>
			</div>
        </form>
    <#elseif section = "info" >
        <div class="alert alert-info" role="alert">
			${msg("emailInstruction")}
		</div>
    </#if>
</@layout.registrationLayout>