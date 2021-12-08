import React from 'react';

function Text() {
    return (
        <section className="text">
            <h1>Enjoy saving your reminders with our app for <span>free</span>!</h1>
            <ul>
                <li>
                    <i class="fa fa-lg fa-check-square" aria-hidden="true"></i>
                    Easy to use.
                </li>
                <li>
                    <i class="fa fa-lg fa-check-square" aria-hidden="true"></i>
                    Free to use with no ads.
                </li>
                <li>
                    <i class="fa fa-lg fa-check-square" aria-hidden="true"></i>
                    Your personal reminders are safe with us.
                </li>
                <li>
                    <i class="fa fa-lg fa-check-square" aria-hidden="true"></i>
                    Reliable
                </li>
            </ul>
        </section>
    );
}

export default Text;