#!/bin/sh

while true
do

	printf "$(date +'%m/%d %H:%M') - run... "

	test_result="$(./node_modules/cypress/bin/cypress run \
		--headed --browser chrome \
		--spec specs/check-availability.cy.js \
		)"
	# echo -n "$test_result"

	if [[ $test_result == *"All specs passed!"* ]]; then
		printf "=== SUCCESS ===\n"
		for i in {1..10}; do afplay /System/Library/Sounds/Purr.aiff -v 10; done
	else
		if [[ $test_result == *"Dates can not be empty"* ]]; then
			printf "FAIL: no dates available\n"
		elif [[ $test_result == *"502: Bad Gateway"* ]]; then
			printf "FAIL: server error\n"
		elif [[ $test_result == *"503: Service Unavailable"* ]]; then
			printf "FAIL: server error\n"
		elif [[ $test_result == *"504: Gateway Timeout"* ]]; then
			printf "FAIL: server error\n"
		elif [[ $test_result == *"test timed out retrying"* ]]; then
			printf "FAIL: timed out\n"
		elif [[ $test_result == *"ECONNREFUSED"* ]]; then
			printf "FAIL: connection refused\n"
		elif [[ $test_result == *"This date is too late: "* ]]; then
			first_date=${test_result#*"This date is too late: "}
			first_date=${first_date:0:10}
			printf "FAIL: the earliest available date is: $first_date\n"
		else
			afplay /System/Library/Sounds/Purr.aiff
			printf "FAIL: unknown\n"
			printf "$test_result\n"
		fi
	fi

	sleep 300

done
