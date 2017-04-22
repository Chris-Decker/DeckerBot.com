
$(document).ready(function(){
	/* Mobile menu toggle */
	$('.menu-icon').click(function(){
		$('.subnav').toggleClass('expand');
		$('.menu-mask').toggleClass('visible');
	});
	$('.menu-mask').click(function(){
		$('.subnav').toggleClass('expand');
		$('.menu-mask').toggleClass('visible');
	});

	/* Domain toggle for proofs */
	$(function(){
		$('.link').click(function(){
			domain = $(this).text();
			siteDesktop = '<img class="proof" src="/images/proofs/' + domain + '/desktop.jpg">';
			siteTablet = '<img class="proof" src="/images/proofs/' + domain + '/tablet.jpg">';
			siteMobile = '<img class="proof" src="/images/proofs/' + domain + '/mobile.jpg">';
			if(domain[0]) {
				$(".desktop-screen").html(siteDesktop);
				$('.tablet-screen').html(siteTablet);
				$('.mobile-screen').html(siteMobile);
			}
		});
	});
});