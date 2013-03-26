$(document).ready(function() {
    var self = this;
    self.autoTransition = false;
    self.autoRepeat = false;
    self.ctas = $('.cta');

    $(document).keypress(function(e) {
        if (e.which == 97 || e.which == 65) {
            // toggle automatic transitions
            self.autoTransition = !self.autoTransition;
        } else if (e.which == 115 || e.which == 83) {
            // advance
            self.nextStep(true);
        }
    });

    self.readyNextStep = function (timeout) {
        setTimeout(
            function() {
                self.nextStep(false);
            },
            timeout);
    };

    self.step1 = function (manual) {
        if (!self.autoTransition && !manual) return;
        self.nextStep = self.step2;
        $(self.ctas[1]).fadeOut(2000);
        $(self.ctas[2]).fadeIn(2000, function () { self.readyNextStep(2000); });
    };

    self.step2 = function(manual) {
        if (!self.autoTransition && !manual) return;
        self.nextStep = self.step3;
        $(self.ctas[2]).fadeOut(2000);
        $(self.ctas[3]).fadeIn(2000, function () { self.readyNextStep(2000); });
    };

    self.step3 = function (manual) {
        if (!self.autoTransition && !manual) return;
        self.nextStep = self.rinseRepeat;
        $(self.ctas[3]).fadeOut(2000);
        $(self.ctas[0]).fadeOut(2000);
        $(self.ctas[4]).fadeIn(2000, function () { self.readyNextStep(2000); });
    };

    self.rinseRepeat = function (manual) {
        if (!self.autoRepeat && !manual) return;
        if (!self.autoTransition && !manual) return;
        self.nextStep = self.step1;
        $(self.ctas[4]).fadeOut(2000);
        $(self.ctas[0]).fadeIn(2000);
        $(self.ctas[1]).fadeIn(2000, function () { self.readyNextStep(2000); });
    };

    self.nextStep = self.step1;
    self.readyNextStep(2000);
});
