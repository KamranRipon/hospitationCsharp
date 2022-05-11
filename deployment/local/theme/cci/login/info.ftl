<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        <#if messageHeader??>
			${messageHeader}
        <#else>
			${message.summary}
        </#if>
    <#elseif section = "form">
		<div class="alert alert-info" id="kc-info-message">
			<span>${message.summary}<#if requiredActions??><#list requiredActions>: <b><#items as reqActionItem>${msg("requiredAction.${reqActionItem}")}<#sep>, </#items></b></#list><#else></#if></span>
			<#if skipLink??>
			<#else>
				<#if pageRedirectUri?has_content>
					<br/>
					<a class="alert-link" href="${pageRedirectUri}">${kcSanitize(msg("backToApplication"))?no_esc}</a>
				<#elseif actionUri?has_content>
					<br/>
					<a class="alert-link" href="${actionUri}">${kcSanitize(msg("proceedWithAction"))?no_esc}</a>
				<#elseif (client.baseUrl)?has_content>
					<br/>
					<a class="alert-link" href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a>
				</#if>
			</#if>
		</div>
    </#if>
</@layout.registrationLayout>