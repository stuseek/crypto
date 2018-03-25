function getRates() {
    $.ajax({
        url: '/getRates'
    }).always(function(data) {
        $('.currency').each(function (i, item) {
            let code = $(this).attr('data-code');
            updateRates(code, data[code][0], i);
        });
    });

    function updateRates(code, data, i) {
        setTimeout(function () {
            let $currencyContainer = $('[data-code=' + code + ']')
            let oldValue = parseFloat($currencyContainer.find('.rate').html())
            let newValue = parseFloat(data.rate).toFixed(2);

            $currencyContainer.find('.rate').html('$'+newValue)
            if (data.rate > data.daily_rate) {
                $currencyContainer.removeClass('falling').addClass('growing')
            } else if (data.rate < data.daily_rate) {
                $currencyContainer.removeClass('growing').addClass('falling')
            }
            if (oldValue != newValue) {
                $currencyContainer.find('.rate').velocity("transition.flipBounceYIn")
            }
        }, i * 250)

    }
}

getRates();

setInterval(getRates, 7500);