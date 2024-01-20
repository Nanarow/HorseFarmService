FROM golang:1.21.4-alpine

WORKDIR /go/src/github.com/sut66/team16
COPY backend .
RUN apk add build-base
RUN go mod tidy
RUN go build -o main .
EXPOSE 8080
CMD ["./main"]