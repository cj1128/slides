build:
	rm -rf docs
	mypresent -c source build -o docs
	cp CNAME docs/
.PHONY: build
