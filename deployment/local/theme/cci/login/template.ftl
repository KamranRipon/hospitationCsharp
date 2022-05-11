<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false showAnotherWayIfPresent=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="robots" content="noindex, nofollow">

		<#if properties.meta?has_content>
			<#list properties.meta?split(' ') as meta>
				<meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
			</#list>
		</#if>
		<title>${msg("loginTitle",(realm.displayName!''))}</title>
		<link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
		<#if properties.stylesCommon?has_content>
			<#list properties.stylesCommon?split(' ') as style>
				<link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
			</#list>
		</#if>
		<#if properties.styles?has_content>
			<#list properties.styles?split(' ') as style>
				<link href="${url.resourcesPath}/${style}" rel="stylesheet" />
			</#list>
		</#if>
		<#if properties.scripts?has_content>
			<#list properties.scripts?split(' ') as script>
				<script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
			</#list>
		</#if>
		<#if scripts??>
			<#list scripts as script>
				<script src="${script}" type="text/javascript"></script>
			</#list>
		</#if>
	</head>

	<body onload="addCheckboxEvent()">
		<main class="container align-middle mw-100 mh-100">
		
			<div class="row mh-100">
				<div class="col-md-10 col-xxl-6 mx-auto mh-100" style="max-width:800px">
					<div class="card my-5 mh-100">
						<div class="card-body row no-gutters mh-100">
							<aside class="col-12 col-md-6 mh-100 d-flex justify-content-center align-items-center">
								<div class="loading-wrapper">
								<div class="cci-logo-wrapper">
									<svg xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										role="img"
										aria-label="Chatbot-Control-Interface Logo"
										id="filter-green"
										width="100%"
										height="100%"
									>
										<path
										d="M 1.614646,2.616 A 1.595983,1.595983 0 0 0 0.01997183,4.2122104 L 0,16.921978 4.8162847,13.093532 H 6.0821919 V 10.945791 H 4.1833313 L 2.1769301,12.540467 V 9.56927 5.1877578 A 0.32063224,0.32063224 0 0 1 2.4964794,4.8697447 H 14.241453 V 4.2122104 A 1.595983,1.595983 0 0 0 12.655998,2.616 Z m 8.1700171,4.0865437 c 0,0 -1.7995047,0.01938 -1.8066836,1.866599 v 7.7598263 c -0.019133,1.701266 1.6745611,1.797466 1.6745611,1.797466 h 4.1326334 l 4.656511,0.02611 L 24,21.452508 23.9924,14.784986 h -2.361299 v 2.522602 l -2.239923,-1.32582 H 10.537464 A 0.31584668,0.31584668 0 0 1 10.222523,15.663753 V 9.251258 A 0.31584668,0.31584668 0 0 1 10.537464,8.934781 H 23.995406 V 7.8363297 c 0,0 -10e-4,-1.11943 -1.242862,-1.133784 z M 21.631033,10.933502 v 2.153884 h 2.365894 v -2.153884 z">	
										</path>
									</svg>
								</div>
								<div class="cci-green cci-logo-text">Chatbot Control Interface</div>
								</div>
							</aside>
							<div class="col px-3 px-sm-4 mh-100">
								<header>
									<#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
										<#if displayRequiredFields>
											<div class="${properties.kcContentWrapperClass!}">
												<div class="${properties.kcLabelWrapperClass!} subtitle">
													<span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
												</div>
												<div class="col-md-10">
													<h5 class="card-title text-center mb-5" id="kc-page-title"><#nested "header"></h5>
												</div>
											</div>
										<#else>
											<h5 class="card-title text-center mb-4"><#nested "header"></h5>
										</#if>
									<#else>
										<#if displayRequiredFields>
											<div class="${properties.kcContentWrapperClass!}">
												<div class="${properties.kcLabelWrapperClass!} subtitle">
													<span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
												</div>
												<div class="col-md-10">
													<#nested "show-username">
													<div id="kc-username" class="${properties.kcFormGroupClass!}">
														<label id="kc-attempted-username">${auth.attemptedUsername}</label>
														<a id="reset-login" href="${url.loginRestartFlowUrl}">
															<div class="kc-login-tooltip">
																<i class="${properties.kcResetFlowIcon!}"></i>
																<span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
															</div>
														</a>
													</div>
												</div>
											</div>
										<#else>
											<#nested "show-username">
											<div id="kc-username" class="${properties.kcFormGroupClass!}">
												<label id="kc-attempted-username">${auth.attemptedUsername}</label>
												<a id="reset-login" href="${url.loginRestartFlowUrl}">
													<div class="kc-login-tooltip">
														<i class="${properties.kcResetFlowIcon!}"></i>
														<span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
													</div>
												</a>
											</div>
										</#if>
									</#if>
								</header>
								<div id="kc-content">
									<div id="kc-content-wrapper">
										<#-- App-initiated actions should not see warning messages about the need to complete the action -->
										<#-- during login.                                                                               -->
										<#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
											<#if message.type = 'success'><div class="alert alert-success" role="alert">${kcSanitize(message.summary)?no_esc}</div></#if>
											<#if message.type = 'warning'><div class="alert alert-warning" role="alert">${kcSanitize(message.summary)?no_esc}</div></#if>
											<#if message.type = 'error'><div class="alert alert-danger" role="alert">${kcSanitize(message.summary)?no_esc}</div></#if>
											<#if message.type = 'info'><div class="alert alert-info" role="alert">${kcSanitize(message.summary)?no_esc}</div></#if>
										</#if>
										<#nested "form"> <!--  THIS IS WHERE THE LOGIN FORM IS LOADED-->
										<#if displayInfo>
											<div id="kc-info" class="mt-3">
												<div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
													<#nested "info">
												</div>
											</div>
										</#if>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</body>
</html>
</#macro>