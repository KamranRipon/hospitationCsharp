<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "header">
        ${msg("updatePasswordTitle")}
    <#elseif section = "form">
        <form id="kc-passwd-update-form" action="${url.loginAction}" method="post">
            <input type="text" id="username" name="username" value="${username}" autocomplete="username" readonly="readonly" style="display:none;"/>
            <input type="password" id="password" name="password" autocomplete="current-password" style="display:none;"/>

            <div class="form-floating mb-3">
				<input class="form-control" type="password" id="password-new" name="password-new" placeholder="${msg("passwordNew")}" autofocus autocomplete="new-password"
					   aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
				/>
                <label for="password-new">${msg("passwordNew")}</label>

				<#if messagesPerField.existsError('password')>
					<div class="mt-2 alert alert-danger" role="alert" id="input-error-password" aria-live="polite">
						${kcSanitize(messagesPerField.get('password'))?no_esc}
					</div>
				</#if>
            </div>

			<div class="form-floating mb-3">
				<input class="form-control" type="password" id="password-confirm" name="password-confirm" placeholder="${msg("passwordConfirm")}" autocomplete="new-password"
					   aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
				/>
				<label for="password-confirm">${msg("passwordConfirm")}</label>

				<#if messagesPerField.existsError('password-confirm')>
					<div class="mt-1 alert alert-danger" role="alert" id="input-error-password-confirm" aria-live="polite">
						${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
					</div>
				</#if>
            </div>

			<div class="form-check mb-3" id="kc-form-options">
				<#if isAppInitiatedAction??>
					<label>${msg("logoutOtherSessions")}</label>
					<input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked>
				</#if>
            </div>

			<div class="d-grid" id="kc-form-buttons">
				<#if isAppInitiatedAction??>
					<input class="" type="submit" value="${msg("doSubmit")}" />
					<button class="btn btn-primary btn-login fw-bold" type="submit" name="cancel-aia" value="true">${msg("doCancel")}</button>
				<#else>
					<button class="btn btn-primary btn-login fw-bold" type="submit" name="submit-aia">${msg("doSubmit")}</button>
				</#if>
			</div>
        </form>
    </#if>
</@layout.registrationLayout>