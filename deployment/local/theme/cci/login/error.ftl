<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        ${msg("errorTitle")}
    <#elseif section = "form">
        <div class="alert alert-danger" id="kc-error-message">
            <span>${message.summary?no_esc}</span>
            <#if client?? && client.baseUrl?has_content>
                <br/>
				<a class="alert-link" id="backToApplication" href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a>
            </#if>
        </div>
    </#if>
</@layout.registrationLayout>